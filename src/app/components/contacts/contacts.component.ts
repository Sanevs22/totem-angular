import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserAPIService } from 'src/app/services/user-api.service';
import { Contact } from 'src/app/interfaces/contact';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less'],
})
export class ContactsComponent {
  contacts!: Contact[];
  subUserLogStatus$!: Subscription;
  subEditor$!: Subscription;
  nickname!: string;
  commentIndex!: number;

  auth = getAuth();
  statusAuth = authState(this.auth);

  form = new FormGroup({
    comment: new FormControl('', [Validators.maxLength(150)]),
  });

  constructor(
    private userAPIService: UserAPIService,
    private router: Router,
    private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.subUserLogStatus$ = this.statusAuth.subscribe((user) => {
      if (!user) {
        this.router.navigate(['start']);
      } else {
        this.userAPIService.getNickname(user?.uid!).then((nickname) => {
          this.nickname = nickname;
          this.userAPIService.getUser(nickname).then((user) => {
            if (user) {
              this.contacts = user.contacts;
            }
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subUserLogStatus$) {
      this.subUserLogStatus$.unsubscribe();
    }
  }

  showDialogEditContact(
    content: PolymorpheusContent<TuiDialogContext>,
    index: number
  ): void {
    this.commentIndex = index;
    this.form.controls.comment.setValue(
      this.contacts[this.commentIndex].comment
    );
    this.subEditor$ = this.dialogs
      .open(content, {
        size: 's',
      })
      .subscribe(() => {});
  }

  updateComment() {
    this.contacts[this.commentIndex].comment =
      this.form.controls.comment.value || '';
    this.userAPIService
      .updateContactsData(this.nickname, this.contacts)
      .then(() => {});
  }

  deleteContact() {
    this.contacts.splice(this.commentIndex, 1);
    this.userAPIService
      .updateContactsData(this.nickname, this.contacts)
      .then(() => {});
  }
}

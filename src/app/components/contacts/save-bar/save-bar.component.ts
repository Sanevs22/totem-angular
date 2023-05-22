import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { authState } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user';
import { UserAPIService } from 'src/app/services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/interfaces/contact';

@Component({
  selector: 'app-save-bar',
  templateUrl: './save-bar.component.html',
  styleUrls: ['./save-bar.component.less'],
})
export class SaveBarComponent {
  isVisible = false;
  isSave = false;

  user: User = {
    nickname: '',
    name: '',
    about: '',
    avatar: '',
    totem: '',
    details: '',
    widgets: [],
    contacts: [],
  };

  contactNickname!: string;

  subUserLogStatus$!: Subscription;
  subEditor$!: Subscription;

  auth = getAuth();
  statusAuth = authState(this.auth);

  form = new FormGroup({
    comment: new FormControl('', [Validators.maxLength(150)]),
  });

  constructor(
    private userAPIService: UserAPIService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit(): void {
    let contactNickname = this.activatedRoute.snapshot.paramMap.get('id');
    if (contactNickname) {
      this.contactNickname = contactNickname;
    }

    this.subUserLogStatus$ = this.statusAuth.subscribe((user) => {
      if (!user) {
        this.isVisible = false;
      } else {
        this.userAPIService.getNickname(user?.uid!).then((nickname) => {
          if (this.contactNickname === nickname) {
            this.router.navigate(['']);
          }
          this.userAPIService.getUser(nickname).then((user) => {
            if (user) {
              this.user = user;
              this.isVisible = true;

              this.user.contacts.forEach((contact) => {
                if (contact.nickname === this.contactNickname) {
                  this.isSave = true;
                }
              });
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
    if (this.subEditor$) {
      this.subEditor$.unsubscribe();
    }
  }

  showDialogSaveContact(content: PolymorpheusContent<TuiDialogContext>): void {
    this.subEditor$ = this.dialogs
      .open(content, {
        size: 's',
      })
      .subscribe(() => {});
  }

  addContacts() {
    this.userAPIService.getUser(this.contactNickname).then((user) => {
      if (user) {
        let contact: Contact = {
          nickname: user.nickname,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          comment: this.form.controls.comment.value || '',
        };
        this.user.contacts.push(contact);
        this.userAPIService
          .updateContactsData(this.user.nickname, this.user.contacts)
          .then(() => {
            this.ngOnInit();
          });
      }
    });
  }

  deleteContacts() {
    let index: number;
    this.user.contacts.forEach((contact, i) => {
      if (contact.nickname === this.contactNickname) {
        index = i;
      }
    });

    this.user.contacts.splice(index!, 1);
    this.isSave = false;
    this.userAPIService
      .updateContactsData(this.user.nickname, this.user.contacts)
      .then(() => {
        this.ngOnInit();
      });
  }

  goContacts() {
    this.router.navigate(['contacts']);
  }
}

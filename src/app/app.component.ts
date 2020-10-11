import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HttpService } from 'src/app/http-service.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogs';
  show = false;
  posts: any;
  userDetails: any;
  page = 1;
  total: number;
  loading: boolean;
  itemsPerPage: 10;
  config: any;
  comments: any;
  user = {
    name: '',
    email: ''
  }
  users: any;
  errMsg: string;

  constructor(
    private httpService: HttpService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.errMsg = '';
    let data = this.cookieService.get('users');
    console.log('data', data)
    if (data) {
      this.users = JSON.parse(data);
    }
    console.log('this.users', this.users)
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.getPosts(0);
  }

  getPosts(page): void {
    this.loading = true;
    this.httpService.get(`posts?page=${page}`)
      .subscribe((data) => {
        this.total = data['meta'].pagination.total;
        this.page = page;
        this.loading = false;
        this.posts = data['data'];
        this.posts = this.posts.slice(0, 10);
        this.posts.forEach(element => {
          element.showMore = false;
        });
        this.config.currentPage = this.page;
        this.config.totalItems = this.total;
        console.log('this.posts', this.posts)
      },
        error => {
          console.log('error==>>>', error)
        });
  }

  getUserById(id): string {
    this.httpService.get(`users/${id}`)
      .subscribe((data) => {
        this.userDetails = data['data'];
        console.log('this.posts', this.userDetails);
      },
        error => {
          console.log('error==>>>', error)
        });
    return this.userDetails.name;
  }

  getComments(id): void {
    this.httpService.get(`posts/${id}/comments`)
      .subscribe((data) => {
        this.comments = data['data'];
        console.log('this.posts', this.userDetails);
      },
        error => {
          console.log('error==>>>', error)
        });
    // return this.userDetails.name;
  }

  userExists(email) {
    return this.users.some((el) => {
      return el.email === email;
    });
  }

  addComment(): void {
    let data1 = this.cookieService.get('users');
    console.log('data', data1)
    if (data1) {
      this.users = JSON.parse(data1);
    }
    let data = [];
    if (!this.users) {
      data.push(this.user);
      var userArr = JSON.stringify(data);
      this.cookieService.set('users', userArr);
    } else {
      if (!this.userExists(this.user.email)) {
        data = this.users;
        data.push(this.user);
        var userArr = JSON.stringify(data);
        this.cookieService.set('users', userArr);
      } else {
        this.errMsg = "User already exixts";
      }
    }

  }
}

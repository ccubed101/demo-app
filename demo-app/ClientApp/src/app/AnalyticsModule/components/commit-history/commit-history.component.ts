import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'commit-history',
	template: `
		<h1 id="titleText">Commit History</h1>
		<table align="center" style="border-spacing: 10px; border-collapse: none; margin-left: 1em">
			<ng-container *ngFor="let commit of commits; let i=index">
				<tr>
					<td colspan="2"><hr></td>
				</tr>
				<tr>
					<td>Date:</td>
					<td style="padding-left: 1em">{{commit.committer.date | date}}</td>
				</tr>
				<tr>
					<td>Name:</td>
					<td style="padding-left: 1em">{{commit.committer.name}}</td>
				</tr>	
				<!-- <tr>
					<td>E-mail:</td>
					<td style="padding-left: 1em">{{commit.committer.email}}</td>
				</tr> -->
				<tr>
					<td style="vertical-align: top">Message:</td>
					<td style="padding-left: 1em">{{commit.message}}</td>
				</tr>
			</ng-container>
		</table>
	`,
	styles: [
		"#titleText { color: red; font-family: Comic Sans MS; font-size: 72px; font-weight: 900; text-align: center }",
	]
})
export class CommitHistoryComponent implements OnInit, OnDestroy {

	// Construction.
	constructor(private httpClient: HttpClient) {
	}


	// Instance variables.

	commits: any[] = [];

	subscriptions: Subscription[] = [];


	// Life-cycle

	ngOnInit() {
		let subscription: Subscription = this.httpClient.get<any>("https://api.github.com/repos/ccubed101/demo-app/commits")
			.subscribe({
				next: response => {
					let arrayItems$ = from(response);
					arrayItems$.pipe(map((item:any) => item.commit)).subscribe({
						next: (commit: any) => {
							this.commits.push(commit);
						},
					});
				},
				error: error => { console.log(error); }
			});
		this.subscriptions.push(subscription);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

}

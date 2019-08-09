export class LoginModel {

	// Construction

	constructor(
		private userName?: string
		, private password?: string
	) {
	}


	// Property accessors.

	public get UserName(): string {
		return this.userName;
	}
	public set UserName(value: string) {
		this.userName = value;
	}

	public get Password(): string {
		return this.password;
	}
	public set Password(value: string) {
		this.password = value;
	}
}

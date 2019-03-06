export interface INavMenuItem {
	Text: string;
	Route: string;
	Children: INavMenuItem[];
}

export class NavMenuItem implements INavMenuItem {

	// Constuction.
	constructor(text: string, route: string, children: NavMenuItem[]) {
		this.Text = text;
		if (route != undefined && route != null)
			this.Route = route;
		if (children != undefined && children != null)
			this.Children.push(...children);
	}


	// Instance variables.

	private text: string = null;
	private route: string = null;
	private children: NavMenuItem[] = [];


	// Property accessors.

	get Text(): string {
		return this.text;
	}
	set Text(value: string) {
		this.text = value;
	}

	get Route(): string {
		return this.route;
	}
	set Route(value: string) {
		this.route = value;
	}

	get Children(): NavMenuItem[] {
		return this.children;
	}
}

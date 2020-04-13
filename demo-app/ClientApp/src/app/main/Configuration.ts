import { NavMenuItem } from './app/expanding-nav-menu/NavMenuItem';


export let configuration = {

    navMenuTree: [] = [
        new NavMenuItem("Splash", "/", null),
        new NavMenuItem("JWT Demo", "JwtDemo", null),
        new NavMenuItem("Commit History", "analytics", null),
        new NavMenuItem("SignalR Chat Demo", "SignalRChatDemo/SignalRChatDemoRoot", null),
        new NavMenuItem("Single Video", "Videos/SingleVideo", null),
        new NavMenuItem("Materials Demo", "MaterialsDemo/MaterialsDemo", null),
        new NavMenuItem("The Revenue Project", "TheRevenueProject/TheRevenueProjectRoot", null),
        new NavMenuItem("Breeze Demo", "BreezeDemo/BreezeDemoRoot", null),
        new NavMenuItem("Ngrx Demo", "NgrxDemo/NgrxDemoRoot", null),
        new NavMenuItem("Animations", null, [
            new NavMenuItem("Route Transitions", null, [
                new NavMenuItem("Route Transition Page #1", "Animations/AnimationsRoot/RouteTransitionPage1", null),
                new NavMenuItem("Route Transition Page #2", "Animations/AnimationsRoot/RouteTransitionPage2", null),
            ]),
            new NavMenuItem("Animated List", "Animations/AnimatedList", null),
            new NavMenuItem("Rotation", "Animations/Rotation", null),
            new NavMenuItem("Rotator Wrapper", "Animations/RotatorWrapper", null),
        ]),
        new NavMenuItem("Routing", "RoutingExamples", [
            new NavMenuItem("Routing Example", "RoutingExamples", null),
            new NavMenuItem("Route Parameter Examples", "RoutingExamples/RouteParameterExamples", null),
        ]),
        new NavMenuItem("Reactive Forms Examples", null, [
            new NavMenuItem("Reactive Forms Example #1", "reactive-forms-demo/reactive-forms-example1", null),
            new NavMenuItem("Reactive Forms Example #2", "reactive-forms-demo/reactive-forms-example2", null),
            new NavMenuItem("Reactive Forms Example #3", "reactive-forms-demo/reactive-forms-example3", null),
        ]),
    ],

}

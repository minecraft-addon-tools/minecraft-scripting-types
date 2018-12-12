declare const enum MyComponent {
    Test = "test:test"
}

declare interface ITestComponent {
    x: number;
}

declare interface ComponentTypeMap {
    [MyComponent.Test]: ITestComponent
}

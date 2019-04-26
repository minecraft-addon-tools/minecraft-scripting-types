declare type IMinecraftObject =
    IEventData<any> | IEntity | ILevel | IComponent<any> |
    IQuery | IItemStack | IBlock | ITickingArea;

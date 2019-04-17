declare interface IBlock {
    /**
     * The type of the object
     */
    readonly __type__: "block";

    /**
     * The identifier of the block
     */
    readonly __identifier__: string;

    /**
     * This is the ticking area object that was used to get this block
     */
    readonly ticking_area: ITickingArea;

    /**
     * This is the position of the block. It also functions as part of its unique identifier
     */
    readonly block_position: VectorXYZ;
}
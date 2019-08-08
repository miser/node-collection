export interface Data {
    name: string;
    value: any;
}
export declare abstract class AbCollect {
    readonly Name: string;
    abstract collect(): Promise<any>;
}
export declare abstract class AbstractCollection {
    protected store: AbCollect[];
    constructor();
    register(collect: AbCollect): void;
    collect(): Promise<Map<string, any>>;
}

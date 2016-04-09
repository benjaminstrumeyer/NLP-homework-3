import {_EstimationMethod} from "./_EstimationMethod";

export class LaplaceSmoothingMethod extends _EstimationMethod
{
    constructor(corpus)
    {
        super(corpus);
    }

    private k = 1;
}
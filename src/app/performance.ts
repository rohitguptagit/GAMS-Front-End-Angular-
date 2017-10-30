import { PerfDist } from './perfs/perfdist'

export class Performance {
	name: string;
	range: Range;
}

export class Range {
	inds: PerfDist[];
	atts: PerfDist[];
}
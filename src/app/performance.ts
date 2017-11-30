import { PerfDist } from './perfs/perfdist'

export class Performance {
	name: string;
	range: Range;
	term: string;
	courseCode: string;
	courseNumber: string;
	section: string;
}

export class Range {
	inds: PerfDist[];
	atts: PerfDist[];
}
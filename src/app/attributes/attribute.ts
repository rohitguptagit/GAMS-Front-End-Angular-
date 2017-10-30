import { Indicator } from '../indicators/indicator';

export class Attribute{
	name: string;
	shortName: string;
	numerator: number;
	denominator: number;
	result: number;
	indicatorScores: Indicator[];
}
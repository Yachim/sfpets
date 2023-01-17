import { Season } from "../types";

export function isEaster(date: Date) {
	const Y = date.getFullYear();

    const C = Math.floor(Y / 100);
    const N = Y - 19 * Math.floor(Y / 19);
    const K = Math.floor((C - 17) / 25);
    let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
    I -= 30 * Math.floor(I / 30);
    I -=
        Math.floor(I / 28) *
        (1 -
            Math.floor(I / 28) *
                Math.floor(29 / (I + 1)) *
                Math.floor((21 - N) / 11));
    let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
    J -= 7 * Math.floor(J / 7);
    const L = I - J;
    const M = 3 + Math.floor((L + 40) / 44);
    const D = L + 28 - 31 * Math.floor(M / 4);

    return date.getDate() === D && date.getMonth() + 1 === M;
}

// new years eve or day
export function isNewYears(date: Date) {
	return (
		(date.getMonth() === 0 && date.getDate() === 1) ||
		(date.getMonth() === 11 && date.getDate() === 31)
	);
}

export function isFriday13(date: Date) {
	return date.getDay() === 5 && date.getDate() === 13;
}

export function isValentine(date: Date) {
    return date.getDate() === 14 && date.getMonth() === 1;
}

export function isBDay(date: Date) {
	return date.getDate() === 22 && date.getMonth() === 5;
}

export function isAprilFools(date: Date) {
	return date.getDate() === 1 && date.getMonth() === 3;
}

const springBeginMonth = 2;
const springEndMonth = 4;
export function isSpring(date: Date) {
	const month = date.getMonth();
	return springBeginMonth <= month && month <= springEndMonth;
}

const summerBeginMonth = 5;
const summerEndMonth = 7;
export function isSummer(date: Date) {
	const month = date.getMonth();
	return summerBeginMonth <= month && month <= summerEndMonth;
}

const fallBeginMonth = 8;
const fallEndMonth = 10;
export function isFall(date: Date) {
	const month = date.getMonth();
	return fallBeginMonth <= month && month <= fallEndMonth;
}

const winterBeginMonth = 11;
const winterEndMonth = 1;
export function isWinter(date: Date) {
	const month = date.getMonth();
	return winterBeginMonth <= month && month <= winterEndMonth;
}

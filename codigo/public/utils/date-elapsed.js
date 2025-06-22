export class DateElapsed {
    static parse(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) throw new Error("Data inválida");
        return date;
    }

    static getDaysPassed(dateString) {
        const date = this.parse(dateString);
        const now = new Date();
        const diff = now - date;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    static getYearsPassed(dateString) {
        const date = this.parse(dateString);
        const now = new Date();
        let years = now.getFullYear() - date.getFullYear();
        const m = now.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < date.getDate())) {
            years--;
        }
        return years;
    }

    static getMonthsPassed(dateString) {
        const date = this.parse(dateString);
        const now = new Date();
        let months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
        if (now.getDate() < date.getDate()) months--;
        return months;
    }

    static getHoursPassed(dateString) {
        const date = this.parse(dateString);
        const now = new Date();
        const diff = now - date;
        return Math.floor(diff / (1000 * 60 * 60));
    }

    static getMinutesPassed(dateString) {
        const date = this.parse(dateString);
        const now = new Date();
        const diff = now - date;
        return Math.floor(diff / (1000 * 60));
    }

    static getSecondsPassed(dateString) {
        const date = this.parse(dateString);
        const now = new Date();
        const diff = now - date;
        return Math.floor(diff / 1000);
    }

    static getFormattedElapsed(dateString) {
        const years = this.getYearsPassed(dateString);
        const months = this.getMonthsPassed(dateString) % 12;
        return `${years} ano(s) e ${months} mês(es)`;
    }
}

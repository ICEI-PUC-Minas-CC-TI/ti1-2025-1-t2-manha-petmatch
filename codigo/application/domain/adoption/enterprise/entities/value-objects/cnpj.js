export class CNPJ {
    value = undefined;

    constructor(value) {
        this.value = value;
    }

    static normalizeCnpj(value) {
        // Regex que tranfoma xxx.xxx.xxx-xx para xxxxxxxxxxx
        return value.replace(/\D/g, '');
    }

    static create(value) {
        const numericCnpj = this.normalizeCnpj(value);

        return new CNPJ(numericCnpj);
    }

    static isCnpjValid(value){
        const numericCnpj = this.normalizeCnpj(value);

        return numericCnpj.length === 14;
    }

    equals(cnpj) {
        return cnpj.value === this.value;
    }
}
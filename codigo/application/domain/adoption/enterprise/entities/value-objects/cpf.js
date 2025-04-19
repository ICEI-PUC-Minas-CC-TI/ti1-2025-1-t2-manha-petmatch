export class CPF {
    value = undefined;

    constructor(value) {
        this.value = value;
    }

    static normalizeCpf(value) {
        // Regex que tranfoma xxx.xxx.xxx-xx para xxxxxxxxxxx
        return value.replace(/\D/g, '');
    }

    static create(value) {
        const numericCpf = this.normalizeCpf(value);

        return new CPF(numericCpf);
    }

    static isCpfValid(value){
        const numericCpf = this.normalizeCpf(value);

        return numericCpf.length === 11;
    }

    equals(cpf) {
        return cpf.value === this.value;
    }
}
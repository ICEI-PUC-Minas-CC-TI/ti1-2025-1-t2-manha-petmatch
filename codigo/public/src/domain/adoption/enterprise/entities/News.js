import { Entity } from "../../../../../core/entities/entity.js"

export class News extends Entity {
    get titulo() {
        return this.props.titulo;
    }

    set titulo(value) {
        this.props.titulo = value;
        this.touch();
    }

    get resumo() {
        return this.props.resumo;
    }

    set resumo(value) {
        this.props.resumo = value;
        this.touch();
    }

    get data() {
        return this.props.data;
    }

    set data(value) {
        this.props.data = value;
        this.touch();
    }

    get categoria() {
        return this.props.categoria;
    }

    set categoria(value) {
        this.props.categoria = value;
        this.touch();
    }

    get imagem() {
        return this.props.imagem;
    }

    set imagem(value) {
        this.props.imagem = value;
        this.touch();
    }

    get conteudo() {
        return this.props.conteudo;
    }

    set conteudo(value) {
        this.props.conteudo = value;
        this.touch();
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    set updatedAt(date) {
        this.props.updatedAt = date;
    }

    touch() {
        this.props.updatedAt = new Date();
    }

    static create(props, id) {
        const news = new News({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }, id);

        return news;
    }
}
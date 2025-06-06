import { Entity } from "../../../../../core/entities/entity.js"

export class News extends Entity {
    get titulo() {
        return this.props.titulo;
    }


    get resumo() {
        return this.props.resumo;
    }


    get data() {
        return this.props.data;
    }


    get categoria() {
        return this.props.categoria;
    }


    get imagem() {
        return this.props.imagem;
    }


    get conteudo() {
        return this.props.conteudo;
    }


    get createdAt() {
        return this.props.createdAt;
    }


    static create(props, id) {
        const news = new News({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return news;
    }
}
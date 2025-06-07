import { News } from "../../domain/adoption/enterprise/entities/News.js";

export class JsonNewsRepositoryMapper {
    static toJson(news) {
        return {
            id: news.id.toString(),
            titulo: news.titulo,
            resumo: news.resumo,
            data: news.data,
            categoria: news.categoria,
            imagem: news.imagem,
            conteudo: news.conteudo,
        }
    }

    static toDomain(jsonData) {
        return News.create({
            titulo: jsonData.titulo,
            resumo: jsonData.resumo,
            data: jsonData.data,
            categoria: jsonData.categoria,
            imagem: jsonData.imagem,
            conteudo: jsonData.conteudo,
        }, jsonData.id)
    }
}
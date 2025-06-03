import { News } from "../../domain/adoption/News.js";

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
            createdAt: news.createdAt.toISOString(),
            updatedAt: news.updatedAt.toISOString()
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
            createdAt: jsonData.createdAt ? new Date(jsonData.createdAt) : new Date(),
            updatedAt: jsonData.updatedAt ? new Date(jsonData.updatedAt) : new Date()
        }, jsonData.id)
    }
}
import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // Aqui vai fazer a leitura do arquivo passado em file.path.
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      // Realizarar a leitura do arquivo linha por linha.
      const parseFile = csvParse();

      // Será responsavel por passar parte a parte das linhas lidas para parseFile.
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    console.log(categories);
  }
}

export { ImportCategoryUseCase };

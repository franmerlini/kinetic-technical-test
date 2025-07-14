import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SelectItem, TreeNode } from '@shared/model';

const categories: SelectItem[] = [
  { id: 1, name: 'Equipos de elevación' },
  { id: 2, name: 'Herramientas eléctricas' },
  { id: 3, name: 'Herramientas de diagnóstico' },
  { id: 4, name: 'Herramientas manuales' },
  { id: 5, name: 'Equipos de lubricación' },
  { id: 6, name: 'Herramientas de corte' },
];

const subCategories: SelectItem[] = [
  { id: 101, name: 'Gatos hidráulicos', parendId: 1 },
  { id: 102, name: 'Gatos mecánicos', parendId: 1 },
  { id: 103, name: 'Grúas de taller', parendId: 1 },
  { id: 201, name: 'Llaves de impacto', parendId: 2 },
  { id: 202, name: 'Taladros', parendId: 2 },
  { id: 203, name: 'Amoladoras', parendId: 2 },
  { id: 301, name: 'Lectores de códigos', parendId: 3 },
  { id: 302, name: 'Escáneres avanzados', parendId: 3 },
  { id: 303, name: 'Multímetros automotrices', parendId: 3 },
  { id: 401, name: 'Llaves de punta abierta', parendId: 4 },
  { id: 402, name: 'Destornilladores', parendId: 4 },
  { id: 403, name: 'Alicates', parendId: 4 },
  { id: 501, name: 'Pistolas engrasadoras', parendId: 5 },
  { id: 502, name: 'Bombas de aceite', parendId: 5 },
  { id: 601, name: 'Sierras de corte', parendId: 6 },
  { id: 602, name: 'Cuchillas de precisión', parendId: 6 },
];

@Injectable({
  providedIn: 'root',
})
export class CategoryDataClient {
  getCategories(): Observable<SelectItem[]> {
    return of(categories);
  }

  getSubCategories(categoryIds: number[]): Observable<SelectItem[]> {
    return of(subCategories.filter(({ parendId }) => categoryIds.includes(parendId ?? 0)));
  }

  getCategoryTree(): Observable<TreeNode<SelectItem>[]> {
    return of(
      categories.map((category) => ({
        key: `${category.id}`,
        label: category.name,
        data: category,
        children: subCategories
          .filter((subCategory) => subCategory.parendId === category.id)
          .map((subCategory) => ({
            key: `${category.id}-${subCategory.id}`,
            label: subCategory.name,
            data: subCategory,
          })),
      }))
    );
  }
}

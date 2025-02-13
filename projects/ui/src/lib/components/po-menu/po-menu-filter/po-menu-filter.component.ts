import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoLanguageService } from '../../../services/po-language/po-language.service';
import { PoMenuFilterLiterals } from './po-menu-filter-literals.interface';

export const poMenuFilterLiteralsDefault = {
  en: <PoMenuFilterLiterals>{ search: 'Search' },
  es: <PoMenuFilterLiterals>{ search: 'Buscar' },
  pt: <PoMenuFilterLiterals>{ search: 'Pesquisar' },
  ru: <PoMenuFilterLiterals>{ search: 'Поиск' }
};

/**
 * @docsPrivate
 *
 * @description
 *
 * Componente que apresenta o campo de pesquisa no po-menu.
 */
@Component({
  selector: 'po-menu-filter',
  templateUrl: './po-menu-filter.component.html'
})
export class PoMenuFilterComponent {
  @Input('p-loading') loading: boolean;

  // utilizado para repassar ao po-clean
  @ViewChild('inputFilter', { read: ElementRef, static: true }) inputFilterElement: ElementRef;

  @Output('p-filter') filter = new EventEmitter();

  readonly literals: {[key: string]: string} = { //DF
    //...poMenuFilterLiteralsDefault[this.languageService.getLanguageDefault()], // DF
    //...poMenuFilterLiteralsDefault[this.languageService.getShortLanguage()] // DF
  };

  constructor(public languageService: PoLanguageService) {
    this.literals = { // DF
      ...poMenuFilterLiteralsDefault[this.languageService.getLanguageDefault()], // DF
      ...poMenuFilterLiteralsDefault[this.languageService.getShortLanguage()] // DF
    }; // DF

  }
  
  filterItems(search: string) {
    this.filter.emit(search);
  }
}

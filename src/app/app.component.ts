import { FocusInOrder, HEADER_COLUMNS, InitData } from './table.definition';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Directive, ElementRef, HostListener, Inject, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

interface rowSelector {
  row: number
  cellId: string
  type?: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('table') table: MatTable<any>;

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
  }

  selection = new SelectionModel<any>(true, []);

  rowHeadDef1: string[] = ["jyuKbnCd", "itemCd", "itemNm", "suu", "unit", "jyuTan", "jyuKin", "syoZei", "tyuNum", "memo", "kanno"];
  rowHeadDef2: string[] = ["jyuKbnNm", "dummy1", "kikaku", "kazeiKbn", "zeirituCd", "zeirituNm", "dummy2", "genTan", "genKin", "araKin", "jyuNou"];

  rowBodyDef1: string[] = ["jyuKbnCd", "itemCd", "itemNm", "suu", "unit", "jyuTan", "jyuKin", "syoZei", "tyuNum", "memo", "kanno"];
  rowBodyDef2: string[] = ["jyuKbnNm", "dummy1", "kikaku", "kazeiKbn", "zeirituCd", "zeirituNm", "dummy2", "genTan", "genKin", "araKin", "jyuNou"];

  transactions = new MatTableDataSource([InitData, InitData, InitData])



  /**
   * 
   * フォーカス移動　Tab or Enter
   * Tab Enter以外のキー入力はあった場合で入力可能フォームの上であればフォームにフォーカスをあてる
   * 
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const focusTerget = this.getNextFocusTerget(event);
    const _targetCell = document.getElementById(focusTerget.cellId + "-" + "box-" + String(focusTerget.row));
    if (event.shiftKey && event.key === 'Tab') {

      const focusTerget = this.getNextFocusTerget(event, -2);
      event.preventDefault();
      document.getElementById(focusTerget.cellId + "-" + "box-" + String(focusTerget.row)).focus();

    } else if ((event.key === 'Tab' || event.key === 'Enter') && _targetCell) {
      event.preventDefault();
      if (_targetCell) {
        setTimeout(() => {
          document.getElementById(focusTerget.cellId + "-" + "box-" + String(focusTerget.row)).focus();

          // TODO：text 全選択の処理　型は不明。
          // (document.getElementById(focusTerget.cellId + "-" + String(focusTerget.row)) as any).select();
        }, 0);
      }
    } else if (event.key === 'Control') {
      const _focusTerget = this.getCtrlFocusTerget(event);
      document.getElementById(_focusTerget.cellId + "-inp-" + String(_focusTerget.row)).focus();
    } else if (event.key === 'ArrowDown') {
      const _focusTerget = this.getArrowNextFocusTerget(event, 1);
      document.getElementById(_focusTerget.cellId + "-box-" + String(_focusTerget.row)).focus();
    } else if (event.key === 'ArrowUp') {
      const _focusTerget = this.getArrowNextFocusTerget(event, -1);
      document.getElementById(_focusTerget.cellId + "-box-" + String(_focusTerget.row)).focus();
    }
  }


  getHeaderColumnsJPWord(key: string) {
    return HEADER_COLUMNS[key]
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // const numSelected = this.selection.selected.length;
    // const numRows = this.transactions.length;
    // return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected()
    //   ? this.selection.clear()
    //   : this.transactions.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any) {
    // if (!row) {
    //   return `${this.isAllSelected() ? "select" : "deselect"} all`;
    // }
    // return `${this.selection.isSelected(row) ? "deselect" : "select"
    //   } row ${row.no + 1}`;
  }

  isEven(num: number): boolean {
    return num % 2 == 0;
  }

  onClickRow(row: any, dataIndex: number): void {
    console.log(`row:${JSON.stringify(row)}`);
    console.log(`dataIndex:${dataIndex}`);
  }

  addData() {
    this.transactions.data.push(InitData);
    this.table.renderRows();
  }


  conversionId(key: string): rowSelector {
    const _ = key.split('-')
    return {
      row: Number(_[2]),
      cellId: _[0],
      type: _[1]
    }
  }

  /**
   * 
   * @param event 
   * @param dir デフォルト０　-1は逆方向
   */
  getNextFocusTerget(event: KeyboardEvent, dir: number = 0): rowSelector {
    const _selector = this.conversionId((event.target as Element).id)
    const currrentClmIndex = FocusInOrder.indexOf(_selector.cellId);
    if (dir < 0) {
      if (FocusInOrder[currrentClmIndex + 1 + dir]) {
        return {
          row: _selector.row,
          cellId: FocusInOrder[currrentClmIndex + 1 + dir],
          type: _selector.type
        }
      } else {
        return {
          row: _selector.row - 1,
          cellId: FocusInOrder[FocusInOrder.length - 1],
          type: _selector.type
        }
      }
    }
    if (FocusInOrder[currrentClmIndex + 1]) {
      return {
        row: _selector.row,
        cellId: FocusInOrder[currrentClmIndex + 1 + dir],
        type: _selector.type
      }
    } else {
      return {
        row: Number(_selector.row) + 1,
        cellId: FocusInOrder[0],
        type: _selector.type
      }
    }
  }

  getArrowNextFocusTerget(event: KeyboardEvent, dir: number = 0): rowSelector {
    const _selector = this.conversionId((event.target as Element).id)
    const currrentClmIndex = FocusInOrder.indexOf(_selector.cellId);

    if (dir > 0) {
      return {
        row: Number(_selector.row) + 1,
        cellId: FocusInOrder[currrentClmIndex],
        type: _selector.type
      }
    } else {
      return {
        row: Number(_selector.row) - 1,
        cellId: FocusInOrder[currrentClmIndex],
        type: _selector.type
      }
    }
  }

  getCtrlFocusTerget(event: KeyboardEvent) {
    const _selector = this.conversionId((event.target as Element).id)
    const currrentClmIndex = FocusInOrder.indexOf(_selector.cellId);
    return {
      row: _selector.row,
      cellId: FocusInOrder[currrentClmIndex],
      type: _selector.type
    }
  }

  deleteData() {
    this.transactions.data.splice(1, 1);
    this.table.renderRows();
  }

}

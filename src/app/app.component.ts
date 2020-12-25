import { HEADER_COLUMNS } from './table.definition';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChildren('box') box: QueryList<ElementRef>;
  @ViewChild('1') i1: ElementRef;
  constructor(private cd: ChangeDetectorRef) {

  }
  ngAfterViewInit(): void {
    console.log();
    this.box.forEach(d => {
      console.log(d);
    })
  }

  selection = new SelectionModel<any>(true, []);

  rowHeadDef1: string[] = ["jyuKbnCd", "itemCd", "itemNm", "suu", "unit", "jyuTan", "jyuKin", "syoZei", "tyuNum", "memo", "kanno"];
  rowHeadDef2: string[] = ["jyuKbnNm", "dummy1", "kikaku", "kazeiKbn", "zeirituCd", "zeirituNm", "dummy2", "genTan", "genKin", "araKin", "jyuNou"];

  rowBodyDef1: string[] = ["jyuKbnCd", "itemCd", "itemNm", "suu", "unit", "jyuTan", "jyuKin", "syoZei", "tyuNum", "memo", "kanno"];
  rowBodyDef2: string[] = ["jyuKbnNm", "dummy1", "kikaku", "kazeiKbn", "zeirituCd", "zeirituNm", "dummy2", "genTan", "genKin", "araKin", "jyuNou"];

  transactions: any[] = [
    {
      jyuKbnCd: "1",
      itemCd: '1',
      itemNm: 'a',
      suu: "",
      unit: "",
      jyuTan: "",
      jyuKin: "",
      syoZei: "",
      tyuNum: "",
      memo: "",
      kanno: "",
      jyuKbnNm: 'a',
      kikaku: 'a',
      kazeiKbn: 'a',
      zeirituCd: "1",
      zeirituNm: "0.8%",
      genTan: "",
      genKin: "",
      araKin: "",
      jyuNou: "",
      dummy1: "",
      dummy2: ""
    }, {
      jyuKbnCd: "1",
      itemCd: '1',
      itemNm: 'a',
      suu: "",
      unit: "",
      jyuTan: "",
      jyuKin: "",
      syoZei: "",
      tyuNum: "",
      memo: "",
      kanno: "",
      jyuKbnNm: 'a',
      kikaku: 'a',
      kazeiKbn: 'a',
      zeirituCd: "1",
      zeirituNm: "0.8%",
      genTan: "",
      genKin: "",
      araKin: "",
      jyuNou: "",
      dummy1: "",
      dummy2: ""
    }
  ];


  getHeaderColumnsJPWord(key: string) {
    return HEADER_COLUMNS[key]
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.transactions.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.transactions.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"
      } row ${row.no + 1}`;
  }

  isEven(num: number): boolean {
    return num % 2 == 0;
  }

  onClickRow(row: any, dataIndex: number): void {
    console.log(`row:${JSON.stringify(row)}`);
    console.log(`dataIndex:${dataIndex}`);
  }

  addData() {
    this.transactions.push({
      jyuKbnCd: "1",
      itemCd: '1',
      itemNm: 'a',
      suu: "",
      unit: "",
      jyuTan: "",
      jyuKin: "",
      syoZei: "",
      tyuNum: "",
      memo: "",
      kanno: "",
      jyuKbnNm: 'a',
      kikaku: 'a',
      kazeiKbn: 'a',
      zeirituCd: "1",
      zeirituNm: "0.8%",
      genTan: "",
      genKin: "",
      araKin: "",
      jyuNou: "",
      dummy1: "",
      dummy2: ""
    });
    this.table.renderRows()
  }
}

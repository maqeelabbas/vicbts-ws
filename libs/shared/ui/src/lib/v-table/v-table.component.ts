import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableAction<T> {
  label: string;
  icon?: string;
  handler: (row: T) => void;
  visible?: (row: T) => boolean;
}

@Component({
  selector: 'lib-v-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './v-table.component.html',
  styleUrls: ['./v-table.component.scss'],
})
export class VTableComponent<T> {
  @Input() columns: TableColumn[] = [];
  @Input() data: T[] = [];
  @Input() actions: TableAction<T>[] = [];
  @Input() loading = false;
  @Input() emptyMessage = 'No data available';
  
  @Output() rowClick = new EventEmitter<T>();
  @Output() sortChange = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChange.emit({ column: column.key, direction: this.sortDirection });
  }

  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCellValue(row: T, key: string): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (row as any)[key];
  }

  isActionVisible(action: TableAction<T>, row: T): boolean {
    return action.visible ? action.visible(row) : true;
  }
}

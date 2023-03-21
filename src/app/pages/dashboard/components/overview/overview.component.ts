import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { IBook } from '../../interfaces/IBook';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  isModalVisible = false;
  validateForm!: FormGroup;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: ReadonlyArray<IBook> = [];
  listOfCurrentPageData: ReadonlyArray<IBook> = [];
  setOfCheckedId = new Set<string>();

  constructor(private booksService: BooksService, private fb: FormBuilder) { }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<IBook>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfSelectedData = this.listOfCurrentPageData.filter(({ isSelected }) => !isSelected);
    this.checked = listOfSelectedData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfSelectedData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ isSelected }) => !isSelected).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onDelete() {
    const listOfSelectedData = Array.from(this.setOfCheckedId.values());
    const requests = listOfSelectedData.map((id) => this.booksService.deleteBook(id));
    forkJoin(requests).subscribe(() => this.loadBooks());
  }

  onAdd() {
    this.isModalVisible = true;
  }

  onEditBook(book: IBook) {
    this.validateForm.controls['id'].setValue(book.id);
    this.validateForm.controls['name'].setValue(book.name);
    this.validateForm.controls['author'].setValue(book.author);

    this.isModalVisible = true;
  }

  ngOnInit(): void {
    this.loadBooks();

    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      author: [null, [Validators.required]]
    });
  }

  loadBooks() {
    this.booksService.getBooks().subscribe(books => this.listOfData = books.map((item) => ({
      id: item.id,
      name: item.name,
      author: item.author,
      isSelected: false
    })));
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.validateForm.reset();
  }

  handleOk(): void {
    const { id, name, author } = this.validateForm.value;

    const observable = id ? this.booksService.updateBook({id, name, author}) : this.booksService.createBook({ name, author });

    observable.subscribe(() => {
      this.isModalVisible = false;
      this.validateForm.reset();

      this.loadBooks();
    });
  }
}

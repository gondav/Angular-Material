import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener } from '@angular/material/tree';

interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface DialogData {
  animal: string;
  name: string;
}

export interface Tile {
  cols: number;
  rows: number;
  color: string;
  text?: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  @ViewChild('inp', {static: true}) inputValue: ElementRef;

  myControl = new FormControl('');
  numOptions: string[] = ['One', 'Two', 'Three'];
  nameOptions: string[] = ['Joe', 'Bill', 'Mary', 'Frank', 'Annabelle'];
  filteredOptions: Observable<string[]>;
  hidden: boolean = false;
  color: string = 'white';
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ]
  }
  allComplete: boolean = false;
  name: string;
  tiles: Tile[] = [
    {
      cols: 4,
      rows: 1,
      color: 'purple',
      text: 'purple'
    },
    {
      cols: 1,
      rows: 2,
      color: 'orange',
      text: 'orange'
    },
    {
      cols: 2,
      rows: 1,
      color: 'pink',
      text: 'pink'
    },
    {
      cols: 2,
      rows: 1,
      color: 'blue',
      text: 'blue'
    },
    {
      cols: 5,
      rows: 1,
      color: 'green',
      text: 'green'
    },
  ];

  value = 0;
  intervalID: any;
  favFood = '...';
  favSeason = ['Winter', 'Spring', 'Summer', 'Autumn'];
  selectedValue = '...';
  selected = '';
  fontSizePx = 100;
  isChecked = true;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,

  )

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.progress();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nameOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {
    console.log(this.inputValue.nativeElement.value)
  }

  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
  }

  changeColor(newColor: string): void {
    this.color = newColor;
    console.log(newColor);
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(task => task.completed);
  }

  someComplete(): boolean {
    if(this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(isCompleted: boolean): void {
    this.allComplete = isCompleted;

    if(this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = isCompleted));
  }

  progress(): void {
    this.intervalID = setInterval(() => {
      this.value < 100 ? this.value += 10 : this.stopInterval();
    }, 2000)
  }

  stopInterval() {
    clearInterval(this.intervalID)
  }

  onRadioButtonChange(): void {
    console.log(this.favFood)
  }

  openSnackBar(): void {
    this._snackBar.open('hello', 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    } as MatSnackBarConfig)

  }

}

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}



// Table, Sort header, Stepper
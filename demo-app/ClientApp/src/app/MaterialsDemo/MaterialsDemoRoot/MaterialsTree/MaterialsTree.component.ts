import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

// Programmer Notes:
// The following modules must be imported for the tree to function correctly:
//   MatTreeModule
//   MatButtonModule
//   MatIconModule

@Component({
    selector: 'MaterialsTree',
    template: `
                <div style="margin-left: 45%">
                   <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
                      <!-- This is the tree node template for leaf nodes -->
                      <!-- 'matTreeNodePadding' causes nested tree nodes to be indented. -->
                      <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
                        <!-- use a disabled button to provide padding for tree leaf -->
                        <button mat-icon-button disabled></button>
                        {{node.name}}
                      </mat-tree-node>
                      <!-- This is the tree node template for expandable nodes -->
                      <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding>
                        <button mat-icon-button matTreeNodeToggle
                                [attr.aria-label]="'toggle ' + node.name">
                          <mat-icon class="mat-icon-rtl-mirror">
                            {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
                          </mat-icon>
                        </button>
                        {{node.name}}
                      </mat-tree-node>
                    </mat-tree>
                </div>
    `,
    styles: []
})
export class MaterialsTreeComponent implements OnInit {

    constructor() {
        this.dataSource.data = TREE_DATA;
    }


    // Life cycle mrthods.

    ngOnInit() {

    }

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'Fruit',
        children: [
            { name: 'Apple' },
            { name: 'Banana' },
            { name: 'Fruit loops' },
        ]
    }, {
        name: 'Vegetables',
        children: [
            {
                name: 'Green',
                children: [
                    { name: 'Broccoli' },
                    { name: 'Brussels sprouts' },
                ]
            }, {
                name: 'Orange',
                children: [
                    { name: 'Pumpkins' },
                    { name: 'Carrots' },
                ]
            },
        ]
    },
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    name: string;
    children?: FoodNode[];
}

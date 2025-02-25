///
/// Copyright © 2016-2024 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Component } from '@angular/core';
import { WidgetSettings, WidgetSettingsComponent } from '@shared/models/widget.models';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import { buildPageStepSizeValues, isDefinedAndNotNull } from '@core/utils';

@Component({
  selector: 'tb-entities-table-widget-settings',
  templateUrl: './entities-table-widget-settings.component.html',
  styleUrls: ['./../widget-settings.scss']
})
export class EntitiesTableWidgetSettingsComponent extends WidgetSettingsComponent {

  entitiesTableWidgetSettingsForm: UntypedFormGroup;
  pageStepSizeValues = [];

  constructor(protected store: Store<AppState>,
              private fb: UntypedFormBuilder) {
    super(store);
  }

  protected settingsForm(): UntypedFormGroup {
    return this.entitiesTableWidgetSettingsForm;
  }

  protected defaultSettings(): WidgetSettings {
    return {
      entitiesTitle: '',
      enableSearch: true,
      enableSelectColumnDisplay: true,
      enableStickyHeader: true,
      enableStickyAction: true,
      showCellActionsMenu: true,
      reserveSpaceForHiddenAction: 'true',
      displayEntityName: true,
      entityNameColumnTitle: '',
      displayEntityLabel: false,
      entityLabelColumnTitle: '',
      displayEntityType: true,
      displayPagination: true,
      defaultPageSize: 10,
      pageStepSize: null,
      pageStepCount: 3,
      defaultSortOrder: 'entityName',
      useRowStyleFunction: false,
      rowStyleFunction: ''
    };
  }

  protected onSettingsSet(settings: WidgetSettings) {
    this.entitiesTableWidgetSettingsForm = this.fb.group({
      entitiesTitle: [settings.entitiesTitle, []],
      enableSearch: [settings.enableSearch, []],
      enableSelectColumnDisplay: [settings.enableSelectColumnDisplay, []],
      enableStickyHeader: [settings.enableStickyHeader, []],
      enableStickyAction: [settings.enableStickyAction, []],
      showCellActionsMenu: [settings.showCellActionsMenu, []],
      reserveSpaceForHiddenAction: [settings.reserveSpaceForHiddenAction, []],
      displayEntityName: [settings.displayEntityName, []],
      entityNameColumnTitle: [settings.entityNameColumnTitle, []],
      displayEntityLabel: [settings.displayEntityLabel, []],
      entityLabelColumnTitle: [settings.entityLabelColumnTitle, []],
      displayEntityType: [settings.displayEntityType, []],
      displayPagination: [settings.displayPagination, []],
      defaultPageSize: [settings.defaultPageSize, [Validators.min(1)]],
      pageStepCount: [isDefinedAndNotNull(settings.pageStepCount) ? settings.pageStepCount : 3,
        [Validators.min(1), Validators.max(100), Validators.required, Validators.pattern(/^\d*$/)]],
      pageStepSize: [isDefinedAndNotNull(settings.pageStepSize) ? settings.pageStepSize : settings.defaultPageSize,
        [Validators.min(1), Validators.required, Validators.pattern(/^\d*$/)]],
      defaultSortOrder: [settings.defaultSortOrder, []],
      useRowStyleFunction: [settings.useRowStyleFunction, []],
      rowStyleFunction: [settings.rowStyleFunction, [Validators.required]]
    });
    buildPageStepSizeValues(this.entitiesTableWidgetSettingsForm, this.pageStepSizeValues);
  }

  public onPaginationSettingsChange(): void {
    this.entitiesTableWidgetSettingsForm.get('defaultPageSize').reset();
    buildPageStepSizeValues(this.entitiesTableWidgetSettingsForm, this.pageStepSizeValues);
  }

  protected validatorTriggers(): string[] {
    return ['useRowStyleFunction', 'displayPagination', 'displayEntityName', 'displayEntityLabel'];
  }

  protected updateValidators(emitEvent: boolean) {
    const useRowStyleFunction: boolean = this.entitiesTableWidgetSettingsForm.get('useRowStyleFunction').value;
    const displayPagination: boolean = this.entitiesTableWidgetSettingsForm.get('displayPagination').value;
    const displayEntityName: boolean = this.entitiesTableWidgetSettingsForm.get('displayEntityName').value;
    const displayEntityLabel: boolean = this.entitiesTableWidgetSettingsForm.get('displayEntityLabel').value;
    if (useRowStyleFunction) {
      this.entitiesTableWidgetSettingsForm.get('rowStyleFunction').enable();
    } else {
      this.entitiesTableWidgetSettingsForm.get('rowStyleFunction').disable();
    }
    if (displayPagination) {
      this.entitiesTableWidgetSettingsForm.get('defaultPageSize').enable();
      this.entitiesTableWidgetSettingsForm.get('pageStepCount').enable();
      this.entitiesTableWidgetSettingsForm.get('pageStepSize').enable();
    } else {
      this.entitiesTableWidgetSettingsForm.get('defaultPageSize').disable();
      this.entitiesTableWidgetSettingsForm.get('pageStepCount').disable();
      this.entitiesTableWidgetSettingsForm.get('pageStepSize').disable();
    }
    if (displayEntityName) {
      this.entitiesTableWidgetSettingsForm.get('entityNameColumnTitle').enable();
    } else {
      this.entitiesTableWidgetSettingsForm.get('entityNameColumnTitle').disable();
    }
    if (displayEntityLabel) {
      this.entitiesTableWidgetSettingsForm.get('entityLabelColumnTitle').enable();
    } else {
      this.entitiesTableWidgetSettingsForm.get('entityLabelColumnTitle').disable();
    }
    this.entitiesTableWidgetSettingsForm.get('rowStyleFunction').updateValueAndValidity({emitEvent});
    this.entitiesTableWidgetSettingsForm.get('defaultPageSize').updateValueAndValidity({emitEvent});
    this.entitiesTableWidgetSettingsForm.get('pageStepCount').updateValueAndValidity({emitEvent});
    this.entitiesTableWidgetSettingsForm.get('pageStepSize').updateValueAndValidity({emitEvent});
    this.entitiesTableWidgetSettingsForm.get('entityNameColumnTitle').updateValueAndValidity({emitEvent});
    this.entitiesTableWidgetSettingsForm.get('entityLabelColumnTitle').updateValueAndValidity({emitEvent});
  }

}

import { TestBed } from '@angular/core/testing';

import { EntryModalService } from './entry-modal.service';

describe('EntryModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryModalService = TestBed.get(EntryModalService);
    expect(service).toBeTruthy();
  });
});

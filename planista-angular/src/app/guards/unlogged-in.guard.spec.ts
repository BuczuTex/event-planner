import { TestBed } from '@angular/core/testing';

import { UnloggedInGuard } from './unlogged-in.guard';

describe('LoggedInGuard', () => {
  let guard: UnloggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnloggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

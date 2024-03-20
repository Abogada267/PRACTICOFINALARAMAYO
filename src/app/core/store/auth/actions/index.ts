import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../../layout/pages/users/models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set auth user': props<{ user: User }>(),
    logout: emptyProps(),
  },
});

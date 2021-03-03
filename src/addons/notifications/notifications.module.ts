// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { CoreCronDelegate } from '@services/cron';
import { CoreMainMenuDelegate } from '@features/mainmenu/services/mainmenu-delegate';
import { CoreMainMenuRoutingModule } from '@features/mainmenu/mainmenu-routing.module';
import { CoreMainMenuTabRoutingModule } from '@features/mainmenu/mainmenu-tab-routing.module';
import { CorePushNotificationsDelegate } from '@features/pushnotifications/services/push-delegate';
import { CoreSettingsDelegate } from '@features/settings/services/settings-delegate';
import { AddonNotificationsMainMenuHandler, AddonNotificationsMainMenuHandlerService } from './services/handlers/mainmenu';
import { AddonNotificationsCronHandler } from './services/handlers/cron';
import { AddonNotificationsPushClickHandler } from './services/handlers/push-click';
import { AddonNotificationsSettingsHandler } from './services/handlers/settings';

const routes: Routes = [
    {
        path: AddonNotificationsMainMenuHandlerService.PAGE_NAME,
        loadChildren: () => import('@/addons/notifications/notifications-lazy.module').then(m => m.AddonNotificationsLazyModule),
    },
];

@NgModule({
    imports: [
        CoreMainMenuRoutingModule.forChild({ children: routes }),
        CoreMainMenuTabRoutingModule.forChild(routes),
    ],
    exports: [CoreMainMenuRoutingModule],
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [],
            useFactory: () => () => {
                CoreMainMenuDelegate.registerHandler(AddonNotificationsMainMenuHandler.instance);
                CoreCronDelegate.register(AddonNotificationsCronHandler.instance);
                CorePushNotificationsDelegate.registerClickHandler(AddonNotificationsPushClickHandler.instance);
                CoreSettingsDelegate.registerHandler(AddonNotificationsSettingsHandler.instance);
            },
        },
    ],
})
export class AddonNotificationsModule {}
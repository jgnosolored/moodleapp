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

import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { CoreContentLinksHandlerBase } from '@features/contentlinks/classes/base-handler';
import { CoreContentLinksAction } from '@features/contentlinks/services/contentlinks-delegate';
import { CORE_DATAPRIVACY_PAGE_NAME } from '@features/dataprivacy/constants';
import { CoreNavigator } from '@services/navigator';
import { makeSingleton } from '@singletons';
import { CoreDataPrivacy } from '../dataprivacy';

/**
 * Handler to treat data requests creation links.
 */
@Injectable({ providedIn: 'root' })
export class CoreDataPrivacyCreateDataRequestLinkHandlerService extends CoreContentLinksHandlerBase {

    name = 'CoreDataPrivacyCreateDataRequestLinkHandler';
    pattern = /\/admin\/tool\/dataprivacy\/createdatarequest\.php.*([?&]type=\d+)/;

    /**
     * @inheritdoc
     */
    getActions(
        siteIds: string[],
        url: string,
        params: Record<string, string>,
    ): CoreContentLinksAction[] | Promise<CoreContentLinksAction[]> {

        const pageParams: Params = {
            createType: Number(params.type),
        };

        return [{
            action: async (siteId): Promise<void> => {
                await CoreNavigator.navigateToSitePath(CORE_DATAPRIVACY_PAGE_NAME, { params: pageParams,  siteId });
            },
        }];
    }

    /**
     * @inheritdoc
     */
    async isEnabled(): Promise<boolean> {
        return await CoreDataPrivacy.isEnabled();
    }

}

export const CoreDataPrivacyCreateDataRequestLinkHandler = makeSingleton(CoreDataPrivacyCreateDataRequestLinkHandlerService);

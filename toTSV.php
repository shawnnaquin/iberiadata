<?php
        $json = Storage::disk('test')->path('iberia_rehab_services.json');
        $json = json_decode(File::get($json));
        $json = (array)$json;

        foreach (
            $json
            as $entry
        ) {

            $entry = (array)$entry;

            $newItem = [
                'name' => $entry['name']??'',
                'itemId' => $entry['item-id']??'',
                'itemCategory' => $entry['category'] ??'',
            ];

            $items = $entry['items']??null;

            if(empty($items)) {
                $allItems[] = $newItem;
                continue;
            }

            foreach(
                $items
                as $item
            ) {

                $item = (array)$item;

                $newItem['itemType'] =
                    $item['type']??'';

                $subTypes =  $item['subtypes']??null;

                if(empty($subTypes)) {
                    $allItems[] = $newItem;
                }

                foreach(
                    $subTypes
                    as $subType
                ) {
                    $subType = (array)$subType;

                    $newItem[
                        'subTypeName'
                    ] = $subType['name'] ?? '';

                    $newItem[
                        'subTypePayorId'
                    ] = $subType['payor-id']??'';


                    $subItems =  $subType['subitems']??null;

                    if(empty($subItems)) {
                        $allItems[] = $newItem;
                        continue;
                    }

                    foreach(
                        $subItems
                        as $subItem
                    ) {
                        $subItem = (array)$subItem;

                        $newItem[
                            'subItemName'
                        ] = $subItem['name']??'';

                        $newItem[
                            'subItemEffectiveDate'
                        ] = $subItem['effective-date']??'';

                        $newItem[
                            'subItemPrice'
                        ] = $subItem['price']??'';
                        $allItems[] = $newItem;

                    }
                }
            }

        }

        $headers = array_keys($allItems[0]);
        $allItems = array_map(function($f) {return implode("\t", array_values($f));}, $allItems);
        $allItems = implode("\n", $allItems);
        $allItems = implode("\t", $headers) . "\n" . $allItems;

        Storage::disk('test')->put(
            'done.csv',
            $allItems
        );

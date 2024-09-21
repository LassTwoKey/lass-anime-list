import { Title } from '@/components/Anime/components/Title'
import { Actions } from '@/components/Anime/components/Actions'
import { SideFilters } from './components/SideFilters'
import { MediaBlock } from './components/MediaBlock'
import { useState } from 'react'
import { ListType } from '@/types'
import useUpdateMediaByParams from './hooks/useUpdateMediaByParams'
import { filtersObj } from '@/constants/filters'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '../ui/button'
import { ListFilter } from 'lucide-react'

export const AnimeContent = () => {
    const currentType = (localStorage.getItem('animeType') ??
        'chart') as ListType

    const [type, setType] = useState(currentType)
    const [filters, setFilters] = useState(filtersObj)

    useUpdateMediaByParams(filters, setFilters)

    return (
        <div className="pt-12 container mx-auto px-4">
            <Title className="my-4" text="📺 Anime" />
            <Actions
                setType={setType}
                filters={filters}
                setFilters={setFilters}
            />

            <div className="flex gap-4 flex-col md:flex-row">
                <SideFilters
                    title="Filters"
                    className="md:w-56 hidden md:flex"
                    filters={filters}
                    setFilters={setFilters}
                />
                <div className="md:hidden">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="flex gap-1">
                                <ListFilter size={18} />
                                Filters
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="h-auto">
                            <div className="container mx-auto px-4 mb-4">
                                <DrawerHeader>
                                    <DrawerTitle className="mb-4">
                                        Filters
                                    </DrawerTitle>
                                </DrawerHeader>
                                <SideFilters
                                    title=""
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <MediaBlock className="flex-1" type={type} filters={filters} />
            </div>
        </div>
    )
}

import { useState } from 'react'
import { ListFilter } from 'lucide-react'
import { Title } from '@/components/MediaFiltersComponents/Title'
import { Actions } from '@/components/MediaFiltersComponents/Actions'
import { SideFilters } from '@/components/MediaFiltersComponents/SideFilters'
import { MediaBlock } from '@/components/MediaFiltersComponents/MediaBlock'
import { ListType } from '@/types'
import useUpdateMediaFilterParams from '@/hooks/useUpdateMediaFilterParams'
import useMediaFilters from '@/hooks/useMediaFilters'
import { filtersObj } from '@/constants/filters'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '../ui/button'

export const AnimeContent = () => {
    const currentType = (localStorage.getItem('animeType') ??
        'chart') as ListType

    const [type, setType] = useState(currentType)
    const savedFilters = useMediaFilters(filtersObj)
    const [filters, setFilters] = useState(savedFilters)

    useUpdateMediaFilterParams(filters)

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
                    isAnime={true}
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
                                    filters={filters}
                                    isAnime={true}
                                    setFilters={setFilters}
                                />
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <MediaBlock
                    className="flex-1"
                    isAnime={true}
                    type={type}
                    filters={filters}
                />
            </div>
        </div>
    )
}

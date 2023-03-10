import { Icon, Button } from 'vant';
import { defineComponent, PropType, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { useTags } from '../../shared/useTags';
import s from './Tags.module.scss';
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    },
    selected: Number
  },
  emits: ['update:selected'],
  setup(props, context) {
    const { tags, hasMore, fetchTags: fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        page: page + 1,
      },{ _mock: 'tagIndex' })
    })

    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id)
    }

    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()
    const router = useRouter()

    const onLongPress = (tagId: Tag['id']) => {
      router.push(`/tags/${tagId}/edit?kind=${props.kind}&return_to=${router.currentRoute.value.fullPath}`)
      console.log('长按');
    }

    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.target as HTMLDivElement
      timer.value = setTimeout(()=>{
        onLongPress(tag.id)
      }, 500)
    }

    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if(currentTag.value?.contains(pointedElement) === false && pointedElement !== currentTag.value){
        clearTimeout(timer.value)
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value)
    }

    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
            <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
              <div class={s.sign}>
                <Icon name="add" class={s.createTag} />
              </div>
              <div class={s.name}>新增</div>
            </RouterLink>
            {tags.value.map(tag =>
              <div 
                class={[s.tag, props.selected === tag.id ? s.selected : ' ']}
                onClick={() => {onSelect(tag)}}
                onTouchstart={(e) => { onTouchStart(e, tag) }}
                onTouchend={onTouchEnd}
              >
                <div class={s.sign}>
                  {tag.sign}
                </div>
                <div class={s.name}>
                  {tag.name}
                </div>
              </div>)
            }
        </div>
        <div class={s.more}>
          { hasMore.value ? <Button onClick={fetchTags} class={s.loadMore}>加载更多</Button> : <span class={s.noMore}>没有更多数据了</span> }
        </div>
      </>
    )
  }
})
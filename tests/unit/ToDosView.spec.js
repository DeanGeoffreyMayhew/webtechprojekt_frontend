import { mount } from '@vue/test-utils'
import ToDosView from '@/views/ToDosView.vue'
import ToDoCreateForm from '@/components/ToDoCreateForm'
import ToDosTable from '@/components/ToDosTable'

describe('Testing ToDosView.vue', () => {
  it('should show page title', () => {
    // when
    const wrapper = mount(ToDosView)

    // then
    expect(wrapper.text()).toMatch('ToDos')
  })

  it('should have ToDoCreateForm component', () => {
    // when
    const wrapper = mount(ToDosView)

    // then
    const cardList = wrapper.findComponent(ToDoCreateForm)
    expect(cardList.exists()).toBeTruthy()
  })

  it('should have ToDosTable component', () => {
    // when
    const wrapper = mount(ToDosView)

    // then
    const createForm = wrapper.findComponent(ToDosTable)
    expect(createForm.exists()).toBeTruthy()
  })
})

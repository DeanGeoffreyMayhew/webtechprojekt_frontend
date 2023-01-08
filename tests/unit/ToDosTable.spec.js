import { mount } from '@vue/test-utils'
import ToDosTable from '@/components/ToDosTable'

describe('Testing ToDosTable.vue', () => {
  it('should render a table entry for each ToDo', () => {
    // when
    const wrapper = mount(ToDosTable, {
      propsData: {
        ToDos: [
          {
            id: 1,
            task: 'Test Task1',
            dueTo: [2022, 11, 2],
            isDone: true
          },
          {
            id: 1,
            task: 'Test Task2',
            dueTo: [2022, 11, 15],
            isDone: false
          }
        ]
      }
    })

    // then
    const toDoEntries = wrapper.findAll('.forTesting')
    expect(toDoEntries.length).toBe(2)
  })
})

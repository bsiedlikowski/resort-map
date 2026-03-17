import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import CabanaTile from './CabanaTile'

describe('CabanaTile component', () => {
  it('displays booked style and does not invoke onClick when booked', () => {
    const onClick = vi.fn()

    const { container } = render(
      <CabanaTile x={0} y={0} type='cabana' booked={true} imgSrc='/assets/cabana.png' rotation={0} onClick={onClick} />
    )

    expect(container.firstChild && (container.firstChild as HTMLElement).classList.contains('tile-cabana-booked')).toBe(true)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('invokes onClick when free cabana is clicked', () => {
    const onClick = vi.fn()

    const { container } = render(
      <CabanaTile x={0} y={0} type='cabana' booked={false} imgSrc='/assets/cabana.png' rotation={0} onClick={onClick} />
    )

    fireEvent.click(container.firstChild as HTMLElement)
    expect(onClick).toHaveBeenCalledWith(0, 0)
  })
})
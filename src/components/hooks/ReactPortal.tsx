import React, { useEffect, useRef } from "react"
import { createPortal } from 'react-dom';

interface ReactPortalProps {
  children: React.ReactNode
}

export const ReactPortal = (props: ReactPortalProps) => {
  const el = useRef(document.createElement('div'));
  useEffect(() => {
    const portal = document.getElementById('portal');
    portal?.appendChild(el.current);

    return () => {
      portal?.removeChild(el.current);
    };

  }, [props.children]);

  return createPortal(props.children, el.current);

  // const ref = useRef<Element | null>(null)
  // const [mounted, setMounted] = React.useState(false)

  // useEffect(() => {
  //   ref.current = document.querySelector<HTMLElement>("#portal")
  //   setMounted(true)
  // }, [])

  // return (mounted && ref.current) ? createPortal(<div
  //   // className={styles.overlay}
  // >{props.children}</div>, ref.current) : null
}

export const ReactPortalDiv = () => <div id='portal'></div>;
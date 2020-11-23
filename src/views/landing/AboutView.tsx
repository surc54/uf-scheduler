import { motion, Variants } from "framer-motion"
import React from "react"

const AboutView: React.FC = () => {
  const wrapperVariants: Variants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  const contentVariants: Variants = {
    visible: {
      opacity: 1,
      translateY: 0
    },
    hidden: {
      opacity: 0,
      translateY: 100
    }
  }
  return (
    <motion.div
      className="text-justify"
      layout
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p variants={contentVariants} initial="hidden">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non semper
        odio. Fusce scelerisque ipsum ac quam volutpat vulputate. Aliquam id
        mollis lacus. Quisque tellus justo, sodales mollis lorem id, malesuada
        efficitur enim. Donec ultricies non elit sit amet tempus. Ut sed viverra
        neque. Etiam elementum vitae tortor eget eleifend. Donec malesuada,
        justo vitae lobortis ornare, lorem massa rutrum tellus, a maximus lectus
        erat sit amet sapien. Quisque vulputate vehicula ante eget condimentum.
        Aenean finibus hendrerit metus eget ullamcorper. Aliquam erat volutpat.
        Aenean tincidunt erat nibh. Maecenas sed lorem velit.
      </motion.p>
      <br />
      <motion.p variants={contentVariants} initial="hidden">
        Aenean pellentesque odio at egestas mollis. Aenean sed urna viverra,
        ultricies ipsum venenatis, ullamcorper odio. Phasellus volutpat orci ac
        elit rutrum dignissim. Fusce sed elit nisi. Praesent vestibulum eget
        magna sit amet congue. Donec hendrerit arcu consequat, porta lacus
        vitae, varius risus. Mauris ac nibh congue, ornare dolor ut, faucibus
        arcu. Nam imperdiet ligula id accumsan pretium. Suspendisse porta tellus
        nisl, nec molestie nulla accumsan at. Cras volutpat imperdiet ante.
        Maecenas fringilla rhoncus nulla.
      </motion.p>
      <br />
      <motion.p variants={contentVariants} initial="hidden">
        Aenean blandit ligula ac augue porttitor, eget convallis ipsum
        elementum. Aliquam hendrerit velit quis magna vulputate, at molestie
        lacus posuere. Fusce ornare cursus risus, ullamcorper dignissim neque
        semper non. Pellentesque leo mauris, laoreet dignissim sapien id,
        eleifend porta ipsum. Aenean iaculis ex ex, et aliquam enim imperdiet
        vitae. Ut vitae magna id nibh semper ultrices vestibulum a mi. Praesent
        accumsan nisi vel nisl rhoncus bibendum. Vivamus mattis lacinia dui
        tincidunt luctus. Aenean ligula libero, aliquam sed eros non, bibendum
        viverra ipsum. Ut ultrices dignissim justo a molestie. Morbi sed lorem
        est. Duis consectetur est mauris, et lobortis nisi facilisis eget.
        Nullam eu molestie neque. Vivamus dapibus dui eros, et venenatis diam
        rhoncus non.
      </motion.p>
    </motion.div>
  )
}

export default AboutView

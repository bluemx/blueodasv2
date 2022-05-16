app.component('layout-grid', {
    props: {
        columns: String,
        columnsMd: String,
        gap: String,
        class: String
    },
    setup (props, context){
        const columns = props.columns || 4
        const columnsMd = props.columnsMd || columns
        const gap = props.gap || 2
        const itemClass = props.class || ''
        return{
            columns,
            columnsMd,
            gap,
            itemClass
        }
    },
    template: `
        <div :class="[
            'layoutGrid',
            'grid',
            'grid-cols-'+columns,
            'md:grid-cols-'+columnsMd,
            'gap-'+gap,
            'rounded-xl',
            itemClass
        ]">
            <slot></slot>
        </div>
        `
})
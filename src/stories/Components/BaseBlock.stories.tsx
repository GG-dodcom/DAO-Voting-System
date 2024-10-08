import type { Meta, StoryObj } from '@storybook/react';
import { BaseBlock } from '../../components';
import '../../assets/css/main.scss';

const meta = {
  title: 'Components/BaseBlock',
  component: BaseBlock,
} satisfies Meta<typeof BaseBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleShowMore = () => {
  console.log('Show more clicked');
};

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <BaseBlock
        title="My Collapsible Card"
        counter={5}
        slim={false}
        loading={false}
        isCollapsable={true}
        showMoreButton={true}
        loadingMore={false}
        onShowMore={handleShowMore}
        showMoreButtonLabel="See More"
      >
        <p>This is the content of the collapsible card.</p>
      </BaseBlock>
    </div>
  ),
};

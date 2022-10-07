import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@components/ui/link';

export default function DropDownC({ data }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { parent, image } = data ?? {};
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(data?.parent, 'Datas c');

  return (
    <div>
      <Button
        style={{ backgroundColor: '#fff', color: '#000' }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {data.slice(0, 12)?.map((item: any, index: any) => (
          <Link
            key={index}
            href={`search/?c=${item?.parent}`}
            // href={data.path}
            className="flex items-center justify-between py-2 ltr:pl-5 rtl:pr-5 xl:ltr:pl-7 xl:rtl:pr-7 ltr:pr-3 rtl:pl-3 xl:ltr:pr-3.5 xl:rtl:pl-3.5 hover:bg-fill-dropdown-hover hover:text-brand-dark"
          >
            <MenuItem onClick={handleClose}>{item.parent}</MenuItem>
          </Link>
        ))}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}

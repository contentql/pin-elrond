'use client'

import Button from '../common/Button'
import Container from '../common/Container'
import DropDown from '../common/DropDown'

import { Media, Page, SiteSetting } from '@payload-types'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { toast } from 'sonner'

import Modal from '@/components/common/Modal'
import LockIcon from '@/svg/LockIcon'
import MenuIcon from '@/svg/MenuIcon'
import SearchIcon from '@/svg/SearchIcon'
import { trpc } from '@/trpc/client'

const Header = ({ initData }: { initData: SiteSetting }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState<string>('')
  const pathName = usePathname()
  const { data } = trpc.user.getUser.useQuery()

  const { mutate: getBlogsBySearch, data: searchResult } =
    trpc.search.getBlogsBySearch.useMutation({
      onError: async () => {
        toast.error('There is some issue!')
      },
    })

  const handleSignPage = () => {
    router.push('/sign-in')
  }


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    e.target.value.length >= 1
      ? getBlogsBySearch({ searchParam: e.target.value })
      : ''
  }

  return (
    <div className=''>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
          setSearchInput('')
        }}>
        <div className='relative h-auto w-full rounded-lg bg-white md:w-[30rem]'>
          {searchInput.length === 0 ? (
            <IoSearch
              size={17}
              className='text-muted-foreground absolute left-4 top-[1.41rem]  transform'
            />
          ) : (
            <IoMdClose
              size={17}
              onClick={() => setSearchInput('')}
              className='text-muted-foreground absolute left-4 top-[1.41rem] transform cursor-pointer'
            />
          )}
          <input
            onChange={handleSearch}
            value={searchInput}
            className='text-md flex h-16 w-full rounded-lg border-b-[1px] pl-10 shadow-sm outline-none'
            placeholder='Search posts, tags and authors'
          />
          <div
            onClick={() => {
              setOpen(false)
              setSearchInput('')
            }}
            className='flex max-h-96 flex-col gap-y-4 overflow-y-scroll'>
            {searchInput.length >= 1 &&
              searchResult?.map((result, index) => {
                if (result?.doc?.relationTo === 'blogs') {
                  return (
                    <div
                      key={index}
                      className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]'>
                      <Link href={result?.path || ''}>
                        <h2 className='text-[1.1rem] font-medium leading-tight text-neutral-800'>
                          {result?.title}
                        </h2>
                      </Link>
                      <p className='mb-0 mt-0 line-clamp-1 text-sm leading-normal text-neutral-400'>
                        {result?.description}
                      </p>
                    </div>
                  )
                } else if (result?.doc?.relationTo === 'tags') {
                  return (
                    <div
                      key={index}
                      className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]'>
                      <Link href={result?.path || ''}>
                        <h2 className='text-[1.1rem] font-medium leading-tight text-neutral-800'>
                          # {result?.title}
                        </h2>
                      </Link>
                    </div>
                  )
                } else if (result?.doc?.relationTo === 'users') {
                  return (
                    <div
                      key={index}
                      className='cursor-pointer space-y-[1px] px-4 py-2 hover:bg-[#f5f5f5]'>
                      <Link
                        className='flex items-center space-x-1'
                        href={result?.path || ''}>
                        <Image
                          alt='user image'
                          height={34}
                          width={34}
                          className='rounded-full'
                          src={
                            result?.imageUrl || '/images/avatar/avatar_5.jpg'
                          }
                        />
                        <h2 className='text-[1.1rem] font-medium leading-tight text-neutral-800'>
                          {result?.title}
                        </h2>
                      </Link>
                    </div>
                  )
                }
              })}
          </div>
        </div>
      </Modal>
      <Container className='z-50 flex h-20 items-center justify-between bg-base-100 px-4 xl:px-0'>
        <div className='flex-[1] justify-start'>
          <Link href={'/'}>
            <Logo className='h-5 w-fit' />
          </Link>
        </div>
        <nav className='mx-auto hidden h-full w-fit select-none items-center justify-center gap-6 px-4 lg:flex'>
          <ul className='mx-auto flex w-fit items-center gap-6 px-4 text-base font-[450] text-[#3F3F46]'>
            <Link
              href={'/style-guide'}
              className={
                pathName === '/style-guide' ? 'text-secondary-content' : ''
              }>
              Style Guide{' '}
              <span className='inline-block bg-gradient-to-r from-[#FED7AA] to-[#F97316] bg-clip-text text-transparent'>
                ✦
              </span>
            </Link>
            <Link
              href={'/features'}
              className={
                pathName === '/features' ? 'text-secondary-content' : ''
              }>
              Features
            </Link>
            <Link
              href={'/membership'}
              className={
                pathName === '/membership' ? 'text-secondary-content' : ''
              }>
              Membership
            </Link>
            <Link
              href={'/author'}
              className={
                pathName === '/author' ? 'text-secondary-content' : ''
              }>
              Authors
            </Link>
            <Link
              href={'/tag'}
              className={pathName === '/tag' ? 'text-secondary-content' : ''}>
              Tags
            </Link>
            <DropDown />
          </ul>
        </nav>
        <div className='xs:gap-x-4 flex h-full w-fit min-w-fit flex-[1] items-center justify-end gap-x-3'>
          <Button
            onClick={() => setOpen(true)}
            className='h-[34px] w-[34px] !rounded-full bg-neutral-content bg-opacity-5 px-1 hover:bg-inherit'>
            <SearchIcon />
          </Button>
          {data?.username ? (
            <Button
              className='h-[34px] !rounded-full bg-primary font-medium text-white'
              onClick={handleSignPage}>
              <span className='hidden text-inherit sm:inline'>✦</span>
              <span className='sm:inline'> logout</span>

  function capitalizeFirstLetter(string: string) {
    if (!string) return string
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    pathName !== '/contact' &&
    pathName !== '/subscribe' && (
      <div className='bg-base-100'>
        <Container className='flex h-20 items-center justify-between bg-base-100 px-4 xl:px-0'>
          <Link href={'/'} className='relative h-5 w-24'>
            <Image alt='' src={(initData?.logoImage as Media)?.url!} fill />
          </Link>
          <nav className='mx-auto hidden h-full select-none items-center justify-center lg:flex'>
            <ul className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
              {initData?.header?.menuLinks?.map((headerLink, index) => (
                <ul
                  key={index}
                  className='flex items-center gap-6 text-base font-[450] text-[#3F3F46]'>
                  {headerLink?.group ? (
                    <DropDown headerLink={headerLink} />
                  ) : headerLink?.menuLink?.externalLink ? (
                    <Link
                      target={`${headerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                      href={headerLink?.menuLink?.link!}>
                      {capitalizeFirstLetter(headerLink?.menuLink?.label!)}
                    </Link>
                  ) : (
                    <Link
                      target={`${headerLink?.menuLink?.newPage ? '_blank' : '_self'}`}
                      href={(headerLink?.menuLink?.page?.value as Page)?.slug!}>
                      {capitalizeFirstLetter(
                        (headerLink?.menuLink?.page?.value as Page)?.title,
                      )}
                    </Link>
                  )}
                </ul>
              ))}
            </ul>
          </nav>
          <div className='xs:gap-x-4 flex h-full items-center justify-end gap-x-3'>
            <Button className='h-[34px] w-[34px] !rounded-full bg-neutral-content bg-opacity-5 px-1 hover:bg-inherit'>
              <SearchIcon />

            </Button>
            {data?.username ? (
              <Button
                className='h-[34px] !rounded-full bg-primary font-medium text-white'
                onClick={handleSignPage}>
                <span className='hidden text-inherit sm:inline'>✦</span>
                <span className='sm:inline'> logout</span>
              </Button>
            ) : (
              <Button
                className='h-[34px] !rounded-full bg-primary font-medium text-white'
                onClick={handleSignPage}>
                <span className='hidden text-inherit sm:inline'>✦</span>
                <span className='hidden sm:inline'> Sign in</span>
                <LockIcon className='inline sm:hidden' />
              </Button>
            )}
            <Button className='h-[34px] w-[34px] !rounded-full p-0 lg:hidden'>
              <MenuIcon />
            </Button>
          </div>
        </Container>
      </div>
    )
  )
}

export default Header

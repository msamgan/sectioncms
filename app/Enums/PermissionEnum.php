<?php

declare(strict_types=1);

namespace App\Enums;

enum PermissionEnum: string
{
    case LanguageList = 'language.list';
    case LanguageCreate = 'language.create';
    case LanguageView = 'language.view';
    case LanguageUpdate = 'language.update';
    case LanguageDelete = 'language.delete';

    case SectionList = 'section.list';
    case SectionCreate = 'section.create';
    case SectionView = 'section.view';
    case SectionUpdate = 'section.update';
    case SectionDelete = 'section.delete';

    case MediumList = 'medium.list';
    case MediumCreate = 'medium.create';
    case MediumView = 'medium.view';
    case MediumUpdate = 'medium.update';
    case MediumDelete = 'medium.delete';

    case BusinessList = 'business.list';
    case BusinessCreate = 'business.create';
    case BusinessView = 'business.view';
    case BusinessUpdate = 'business.update';
    case BusinessDelete = 'business.delete';

    case RoleList = 'role.list';
    case RoleCreate = 'role.create';
    case RoleView = 'role.view';
    case RoleUpdate = 'role.update';
    case RoleDelete = 'role.delete';

    case UserList = 'user.list';
    case UserCreate = 'user.create';
    case UserView = 'user.view';
    case UserUpdate = 'user.update';
    case UserDelete = 'user.delete';

    public function can(): string
    {
        return match ($this) {
            self::BusinessList => 'can:business.list',
            self::BusinessCreate => 'can:business.create',
            self::BusinessView => 'can:business.view',
            self::BusinessUpdate => 'can:business.update',
            self::BusinessDelete => 'can:business.delete',

            self::RoleList => 'can:role.list',
            self::RoleCreate => 'can:role.create',
            self::RoleView => 'can:role.view',
            self::RoleUpdate => 'can:role.update',
            self::RoleDelete => 'can:role.delete',

            self::UserList => 'can:user.list',
            self::UserCreate => 'can:user.create',
            self::UserView => 'can:user.view',
            self::UserUpdate => 'can:user.update',
            self::UserDelete => 'can:user.delete',

            self::MediumList => 'can:medium.list',
            self::MediumCreate => 'can:medium.create',
            self::MediumView => 'can:medium.view',
            self::MediumUpdate => 'can:medium.update',
            self::MediumDelete => 'can:medium.delete',

            self::SectionList => 'can:section.list',
            self::SectionCreate => 'can:section.create',
            self::SectionView => 'can:section.view',
            self::SectionUpdate => 'can:section.update',
            self::SectionDelete => 'can:section.delete',

            self::LanguageList => 'can:language.list',
            self::LanguageCreate => 'can:language.create',
            self::LanguageView => 'can:language.view',
            self::LanguageUpdate => 'can:language.update',
            self::LanguageDelete => 'can:language.delete',
        };
    }
}

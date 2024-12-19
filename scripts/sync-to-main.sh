#!/bin/bash

confirm_action() {
    read -p "Do you want to process the branch $1? (y/N): " confirm
    if [[ $confirm == "y" ]]; then
        return 0
    else
        echo "Skipping $1."
        return 1
    fi
}

confirm_main_rebase() {
    read -p "Do you want to fetch and rebase main to remote? (y/N): " confirm
    if [[ $confirm == "y" ]]; then
        echo "Rebasing main..."
        return 0
    else
        echo "Skipping rebasing main."
        return 1
    fi
}

process_branch() {
    branch=$1
    if confirm_action "$branch"; then
        echo "Processing $branch..."
        git checkout "$branch" || exit 1
        git reset --hard main || exit 1
        git push origin --force "$branch" || exit 1
        echo "Successfully processed $branch."
    fi
}

if confirm_main_rebase; then
    git checkout main
    git fetch
    git rebase origin/main
    echo "Successfully rebased main to remote."
fi

# Process branches
process_branch "staging-main"
process_branch "testnet"

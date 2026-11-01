"""Extract a Pages TAR containing only regular files/directories inside its root."""
import pathlib
import sys
import tarfile


def extract(archive, destination):
    root = pathlib.Path(destination).resolve()
    root.mkdir(parents=True, exist_ok=False)
    with tarfile.open(archive, "r:") as source:
        members = source.getmembers()
        if len(members) > 100000 or sum(item.size for item in members) > 1024 ** 3:
            raise ValueError("Recovery artifact exceeds Pages limits")
        names = set()
        for item in members:
            if pathlib.PurePosixPath(item.name).is_absolute() or ".." in pathlib.PurePosixPath(item.name).parts or "\\" in item.name:
                raise ValueError("Unsafe archive path: " + item.name)
            target = (root / item.name).resolve()
            if (target != root and root not in target.parents) or not (item.isfile() or item.isdir()):
                raise ValueError("Unsafe archive member: " + item.name)
            if item.isfile() and target in names:
                raise ValueError("Duplicate archive file: " + item.name)
            if item.isfile():
                names.add(target)
        source.extractall(root, members=members, filter="data")


if __name__ == "__main__":
    extract(sys.argv[1], sys.argv[2])
